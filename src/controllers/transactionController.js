const User = require("../models/User");
const UserBalance = require("../models/UserBalance");
const Service = require("../models/Service");
const Transaction = require("../models/Transaction");
const generateInvoiceCode = require("../utils/invoiceGenerator");

exports.topupBalance = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { top_up_amount } = req.body;
    if (top_up_amount === undefined || top_up_amount === null) {
      return res.status(400).json({
        status: 102,
        message:
          "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        data: null,
      });
    }

    if (typeof top_up_amount !== "number" || top_up_amount < 0) {
      return res.status(400).json({
        status: 102,
        message:
          "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        data: null,
      });
    }

    await UserBalance.updateBalance(userId, top_up_amount, "plus");
    const data = {
      invoice_number: null,
      service_code: null,
      service_name: "Top Up balance",
      transaction_type: "TOP UP",
      total_amount: top_up_amount,
    };
    const [result] = await Transaction.create(data, userId);

    const transactionId = result.insertId;

    const invoiceCode = generateInvoiceCode(transactionId);
    await Transaction.updateInvoiceCode(transactionId, invoiceCode);

    const updatedTransaction = await Transaction.getTransactionById(
      transactionId
    );
    const balance = await UserBalance.getBalance(userId);
    res.json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: balance,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan!", error: error.message });
  }
};

exports.buy = async (req, res) => {
  const userId = req.user.userId;
  const { service_code } = req.body;

  try {
    const service = await Service.getServiceByCode(service_code);
    if (!service) {
      return res.status(400).json({
        status: 102,
        message: "Service ataus Layanan tidak ditemukan",
        data: null,
      });
    }

    const balance = await UserBalance.getBalance(userId);
    if (balance < service.service_tariff) {
      return res.status(400).json({
        status: 102,
        message: "balance tidak cukup",
        data: null,
      });
    }

    await UserBalance.updateBalance(userId, service.service_tariff, "minus");

    const data = {
      invoice_number: "-",
      service_code: service.service_code,
      service_name: service.service_name,
      transaction_type: "PAYMENT",
      total_amount: service.service_tariff,
    };
    const [result] = await Transaction.create(data, userId);

    const transactionId = result.insertId;

    const invoiceCode = generateInvoiceCode(transactionId);
    await Transaction.updateInvoiceCode(transactionId, invoiceCode);

    const updatedTransaction = await Transaction.getTransactionById(
      transactionId
    );

    res.json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: updatedTransaction.invoice_number,
        service_code: updatedTransaction.service_code,
        service_name: updatedTransaction.service_name,
        transaction_type: updatedTransaction.transaction_type,
        total_amount: updatedTransaction.total_amount,
        created_on: updatedTransaction.created_at,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan!", error: error.message });
  }
};


exports.history = async(req,res)=>{
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const userId = req.user.userId;

        const [history] = await Transaction.getHistory(offset, limit, userId);

        res.json({
            status:0,
            message: "Get History Berhasil",
            data:{
                offset:offset,
                limit:limit,
                records: history
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil history transaksi!", error: error.message });
    }

};
