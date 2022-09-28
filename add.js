class Add
{
   
   constructor(id,elements,link) {
    this.id = id;
    this.elements = elements;
    this.link = link;
    this.delbutton = '<button class="btn btn-danger btn-sm" type="button" onClick="Add.deleteRow(this,'+this.id+')">-</button>';
    
} 
AddClick(element)
{
     element.addEventListener('click',()=>this.addNewRow());
}

async addNewRow()
{
    const table = document.getElementById(this.id);
	const rowCount = table.rows.length;
	const cellCount = table.rows[0].cells.length;
	const cellCountEdit = cellCount-1;
	const tbody = table.tBodies[0];
	const row = tbody.insertRow(-1);
			
	const objectFromElements =  await this.obj(this.elements);
	for(let i=0; i < cellCount; i++){		
		let cell = row.insertCell(i);
		
		if(i === cellCountEdit) {
			cell.setAttribute("class", "text-center");
			cell.innerHTML = this.delbutton;
		} else {
			cell.append(objectFromElements[i]);
		}
	}
    this.selectView(this.id);
	
}
async obj(jsElem) {
	
	let elem = [];
	for(let i = 0; i < jsElem.length; i++) {
		if(jsElem[i].elementTyp == 'text') {
			const newdiv = document.createElement("input");
			newdiv.id = jsElem[i].id;
			newdiv.setAttribute("name", jsElem[i].name);
			newdiv.setAttribute("class", "form-control form-control-sm rounded-0");
			newdiv.setAttribute("placeholder", jsElem[i].placeholder);
			
			elem.push(newdiv);
			
		} else if(jsElem[i].elementTyp == 'select') {
			const newp = await this.selectCreateElem(jsElem[i].url, jsElem[i].id, jsElem[i].name);
			
			elem.push(newp);
		}
	}
	
	return elem;
}
async selectCreateElem(url, id, name) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const selectEL = document.createElement("select");
    selectEL.setAttribute('name', name);
    selectEL.setAttribute('class', "form-select form-select-sm rounded-0");
    selectEL.setAttribute('id', id);
 
    Object.entries(data.rates).forEach(([code, value]) => {
      const optionEl = document.createElement("option");
	  optionEl.setAttribute('value', code);
	  optionEl.innerText = value;
      selectEL.append(optionEl);
    });

    return selectEL;
     
	
  } catch (err) {
	  console.log(err);
  }
}
async  selectLoadRender() {
    const table = document.getElementById(this.id);
	const rowCount = table.rows.length;
	const cellCount = table.rows[0].cells.length;
	const cellCountEdit = cellCount-1;
	const tbody = table.tBodies[0];
	
	const selectAllFormElements = await this.selectRows();
		
	selectAllFormElements.forEach((value, index) => {
		let row = tbody.insertRow();
		
		for(let i=0; i < cellCount; i++) {
			let cell = row.insertCell(i);
					
			if(i === cellCountEdit) {
				cell.setAttribute("class", "text-center");
				cell.innerHTML =  this.delbutton;
			} else {
				cell.innerHTML = value[i];
			}
		}
	});
	
	this.selectView(this.id);
}

//Javitásra szorul ,PHP fájl gondok
async  selectRows() {
  try {
    const response = await fetch(this.link);
    const data = await response.json();
	
    return data;
	
  } catch (err) {
	  console.log(err);
  }
}
 selectView(tableIDS) {
	const tableID = document.getElementById(tableIDS);
	let sList = tableID.querySelectorAll("select");
	
	if (sList != null) {
		for (let sl of sList) {
			dselect(sl, { search: true, size: 'sm' });
		}
	}
}


 static deleteRow(rowsID,id) {
	const table = document.getElementById(id.id);
	const rowCount = table.rows.length;
	if(rowCount <= 1) {
		return;
	}
	if(rowsID) {
		table.deleteRow(rowsID.parentNode.parentNode.rowIndex);
	}
}

}