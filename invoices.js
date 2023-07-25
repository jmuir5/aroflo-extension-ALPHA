//tag control and excecution for invoices 
chrome.storage.sync.get("invoiceTag", async ({ invoiceTag }) => {
    window.addEventListener('load', async() => {
        if(invoiceTag>0){
            var status = document.getElementById("selectedFinancialStatus")
            var balance = document.getElementById("BalanceDue")
            if(status.value=="0" && balance.innerText == "0.00"){
                status.value="2"
                document.getElementById("saveInvoiceBtn").click()
            }
            else {
                window.close();
            }
        }
    })

})