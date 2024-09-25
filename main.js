const formContainer = document.getElementById("formContainer");
const closeFormButton = document.getElementById("closeForm");
const messageEl = document.getElementById("message");
const dataContainer = document.getElementById("data-container");
const submitbtn = document.getElementById("submitBtn");
const nameData = document.getElementById("name");
const emailData = document.getElementById("email");

// Generate unique id
const generateId = () =>
  `id_${Date.now()}_${Math.floor(Math.random() * 10000)}`;


const sc = new StorageClass();

submitbtn.addEventListener("click", (e) => {
  e.preventDefault();


  const name = nameData.value.trim();
  const email = emailData.value.trim();


  if (!name) {
    messageEl.textContent = "Name is required!";
    messageEl.style.color = "red";
    return;
  }

  if (!email) {
    messageEl.textContent = "Email is required!";
    messageEl.style.color = "red";
    return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    messageEl.textContent = "Please enter a valid email address!";
    messageEl.style.color = "red";
    return;
  }

  
  const data = {
    name: name,
    email: email,
    id: generateId(),
  };

 
  sc.save(data);
  updateTable()

  nameData.value = "";
  emailData.value = "";
  messageEl.textContent = "Data saved successfully!";
  messageEl.style.color = "green"; 
  
  setTimeout(() => {
    closeForm()
    messageEl.textContent = ''
  }, 200);
});

function updateTable() {
  let str = "";
  const data = sc.getData();
  if(data ){
    Object.entries(data).forEach(([key, value], i) => {
        str += `
            <tr class="text-center text-wrap font-serif">
             <td class="border min-w-10">${i + 1}</td>
            <td class="border min-w-10">${value.name}</td>
           <td class="border min-w-10">${value.email}</td>
           <td class="border min-w-10 text-yellow-600 bg-yellow-100 cursor-pointer hover:bg-yellow-700 hover:text-white" onclick="update('${
             value.id
           }')">&#x270E;</td>
           <td class="border min-w-10 text-red-600 bg-red-100 cursor-pointer hover:shadow-xl hover:bg-red-700 hover:text-white" onclick="remove('${
             value.id
           }')" >&#x1F5D1;</td>
        </tr>
            
            
            `;
      });
  }

  if (Object.keys(data).length==0) {
      str = `<h1 class="w-full h-full text-center text-3xl">No Data Available</h1>`
  
  }

  dataContainer.innerHTML = str;
 
}


function closeForm(){
    formContainer.style.display='none'
}
function openForm(){
    submitbtn.textContent = 'Create'
    formContainer.style.display = 'flex'
}

function remove(key){
    sc.remove(key);
    updateTable();
}


function update(key) {
    openForm()

    submitbtn.textContent = 'Update'
   const data =  sc.getDataById(key);
   console.log(data);
   nameData.value =data.name;
   emailData.value = data.email;
   
    sc.remove(key);
}

updateTable();