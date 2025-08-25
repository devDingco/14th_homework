function changeNumber() { 
  let phoneNumber = document.getElementById("phoneNumber").value
  
  if (phoneNumber.length === 3) {
    phoneNumber = phoneNumber + "-"
    document.getElementById("phoneNumber").value=phoneNumber
  }
  else if (phoneNumber.length === 8) {
    phoneNumber = phoneNumber + "-"
    document.getElementById("phoneNumber").value=phoneNumber
  }
} 