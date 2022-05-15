
const sliderLine = document.querySelector('.slider-line');
let offset = -1025;



function next(){
    offset-=1025;
    if (offset<-2050){
        offset=0;
    }
    sliderLine.style.left=offset+'px';
}
function prev(){
    offset+=1025;
    if (offset>0){
        offset=-2050;
    }
    sliderLine.style.left=offset+'px';
}

//slider
function createSlider(num, parent_id, text, img, comment)
{
    const parent = document.getElementById(parent_id)

    const clientDiv = document.createElement('div')
    clientDiv.className = "client-container"
    clientDiv.id = "client-div"

    const comm = document.createElement('p')
    comm.id = 'comm'
    comm.textContent = comment
    comm.className = 'c-description'

    const imgTag = document.createElement("img")
    imgTag.className="clients-photo"
    imgTag.src = img
    imgTag.alt = "Client's photo"

    const pTag = document.createElement("p")
    pTag.textContent = text
    pTag.className = "client-name"

    clientDiv.appendChild(imgTag)
    clientDiv.appendChild(pTag)

    const scrollDiv=document.createElement("div")
    scrollDiv.className="clients-scroller"

    for (let i = 0; i < 3; i++)
    {
        let selectorDiv = document.createElement('div')
        selectorDiv.className = "scroll-box"
        if (num === i)
        {
            selectorDiv.style="background-color: #ff0036"
        }
        selectorDiv.onclick = function () {
            localStorage.setItem('number',JSON.stringify(i))
            removeSlider('clients-words')
            createSlider(i,'clients-words',names[i],pics[i],comments[i])
        }
        scrollDiv.appendChild(selectorDiv)
    }
    clientDiv.appendChild(scrollDiv)
    parent.appendChild(comm)
    parent.appendChild(clientDiv)
}

function removeSlider(parent_id)
{
    const parent = document.getElementById(parent_id)

    const comm = document.getElementById('comm')
    const clientDiv = document.getElementById('client-div')

    parent.removeChild(comm)
    parent.removeChild(clientDiv)
}

const names = ['AMR SROUR', 'JOHAN DOE', 'SARAH DOE']
const pics = ['assets/images/user_photo.png', 'assets/images/user_photo1.png', 'assets/images/user_photo2.png']
const comments = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed magna vel' +
' velit dignissim luctus eu in urna. Dapibus egestas turpis.', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed magna vel' +
' velit dignissim luctus eu in urna. Dapibus egestas turpis.', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed magna vel' +
' velit dignissim luctus eu in urna. Dapibus egestas turpis.']

function setSlider()
{
    let num = JSON.parse(localStorage.getItem('number'))
    num = (num+1) % 3
    try {
        removeSlider('clients-words')
    }catch{
        console.log('error')
    }

    createSlider(num,'clients-words',names[num],pics[num],comments[num])
    localStorage.setItem('number', JSON.stringify(num))
}

if (localStorage.getItem('number') == null){
    localStorage.setItem('number', '0');
}

const num = JSON.parse(localStorage.getItem('number'))
createSlider(num,'clients-words',names[num],pics[num],comments[num])

setInterval(function () {setSlider()}, 7000)

//modal window

function _createModal() {
	const modal = document.createElement('div')
	modal.classList.add('modal')
	document.body.appendChild(modal)

	const modal_bg = document.createElement('div')
	modal_bg.classList.add('Nmodal_bg')
	modal_bg.setAttribute('id', 'N_modal_bg')
	modal_bg.setAttribute('data-close', 'true')
	modal.appendChild(modal_bg)

	const modal_container = document.createElement('div')
	modal_container.classList.add('Nmodal_container')
	modal_container.setAttribute('id', 'cont')
	modal_bg.appendChild(modal_container)

	const title = document.createElement('span')
	title.classList.add('Nmodal_title')
	title.innerText = 'Order form'
	modal_container.appendChild(title)

	const close_btn = document.createElement('span')
	close_btn.classList.add('Nmodal_close')
	close_btn.innerText = 'X'
	close_btn.setAttribute('data-close', 'true')
	modal_container.appendChild(close_btn)


	const modal_body = document.createElement('div')
	modal_body.classList.add('modal-body')
	modal_container.appendChild(modal_body)

    const input_phone = document.createElement('input')
	input_phone.setAttribute('type', 'tel')
	input_phone.id = 'in-phone'
	modal_body.appendChild(input_phone)

    const lable_phone = document.createElement('lable')
	lable_phone.classList.add('Nmodal_lable')
    lable_phone.innerText = 'Phone'
	modal_body.appendChild(lable_phone)

	const input_email = document.createElement('input')
	input_email.setAttribute('type', 'email')
	input_email.id = 'in-email'
	modal_body.appendChild(input_email)

    const lable_email = document.createElement('lable')
	lable_email.classList.add('Nmodal_lable')
    lable_email.innerText = 'Email'
	modal_body.appendChild(lable_email)

	const input_name = document.createElement('input')
	input_name.setAttribute('type', 'text')
	input_name.id = 'in-name'
	modal_body.appendChild(input_name)

    const lable_name = document.createElement('lable')
	lable_name.classList.add('Nmodal_lable')
    lable_name.innerText = 'Name'
	modal_body.appendChild(lable_name)

	const modal_footer = document.createElement('div')
	modal_footer.classList.add('modal-footer')
	modal_container.appendChild(modal_footer)

	const send_btn = document.createElement('button')
	send_btn.id = 'btn-send'
	send_btn.setAttribute('disabled', 'disabled')
	send_btn.classList.add('disable-btn')
	send_btn.setAttribute('data-send', 'true')
	send_btn.innerText = 'Send'
	modal_footer.appendChild(send_btn)
	

 	return modal
}

function modal() {
	const $modal = _createModal()

	let destroyed = false

	const modal = {
		open() {
			if (destroyed) {
				return
			}
			$modal.classList.add('open')
		},
		close() {
			$modal.classList.remove('open')
		}
	}

	const listener = event => {
		if (event.target.dataset.close) {
			modal.close()
		}
	}

	$modal.addEventListener('click', listener)

	return Object.assign(modal, {
		destroy() {
			$modal.parentNode.removeChild($modal)
			$modal.removeEventListener('click', listener)
			destroyed = true
		}
	})
	
}
const currModal = modal()

console.log(localStorage)
document.addEventListener("click", event=> {
	if (event.target.dataset.open === "open" && localStorage['Ordered'] !== 'true') {
		currModal.open()
		volidateData()
	}
	else if (event.target.dataset.open === "open" && localStorage['Ordered'] === 'true') {
        let text_err = 'You have alrady ordered'
		modalMessage(text_err)
		currModal.open()
		setTimeout(currModal.close, 5000)
	}
})

document.addEventListener('click', event=> {
	if (event.target.dataset.send === 'true') {
		let text_ok = 'Order is accepted' 
        currModal.close()
		modalMessage(text_ok)
		currModal.open()
		localStorage.setItem('Ordered', 'true')

		setTimeout(currModal.close, 5000)
	}
})

function modalMessage(mod_text) {
	let modal_content = document.getElementById('cont')
	console.log(modal_content)
	let parent = document.getElementById('N_modal_bg')
	if (modal_content != null) {
		let del = parent.removeChild(modal_content)

		const window_div = document.createElement('div')
		window_div.classList.add('Nmodal_container')
		parent.appendChild(window_div)

		const text = document.createElement('p')
		text.innerText = mod_text
		window_div.appendChild(text)
	}
}

function volidateData() {
	var inputs = []
	var name = document.getElementById('in-name')
	var email = document.getElementById('in-email')
	var phone = document.getElementById('in-phone')
	var btn_send = document.getElementById('btn-send')

	inputs.push(name, email, phone)
	console.log(inputs)

	const handleChange = () => {
		if (name.value === "") {
			btn_send.setAttribute('disabled', '')
			btn_send.classList.add('disable-btn')
			btn_send.classList.remove('active-btn')
			return
		}
		if (!IsEmailCorrect(email.value)) {
			btn_send.setAttribute('disabled', '')
			btn_send.classList.add('disable-btn')
			btn_send.classList.remove('active-btn')
			return
		}
		if(!IsCorrectPhone(phone.value)) {
			btn_send.setAttribute('disabled', '')
			btn_send.classList.add('disable-btn')
			btn_send.classList.remove('active-btn')
			return
		}
		btn_send.removeAttribute('disabled')
		btn_send.classList.remove('disable-btn')
		btn_send.classList.add('active-btn')
	}

	for (const input of inputs) {
		input.onkeydown = input.onkeyup = input.onkeypress = input.change = handleChange
	}
}

function IsEmailCorrect(email) {
	let re = /[\w]+@[A-Za-z]+\.[a-zA-Z]+/
	return re.test(String(email).toLowerCase())
}

function IsCorrectPhone(phoneNum) {
	let re =  /(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})/
	return re.test(String(phoneNum).toLowerCase())
}

