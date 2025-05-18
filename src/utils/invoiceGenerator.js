const generateInvoiceCode = (transactionId) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari index 0
    const year = today.getFullYear();

    const transactionCode = String(transactionId).padStart(3, "0"); // Format XXX

    return `INV${day}${month}${year}-${transactionCode}`;
};

module.exports = generateInvoiceCode;