export default class Customizator {
	constructor() {
		this.btnBlock = document.createElement('div');
		this.colorPicker = document.createElement('input');
		this.clear = document.createElement('div');
		this.scale = +localStorage.getItem('scale') || 1;
		this.color = localStorage.getItem('color') || '#ffffff';
	}

	setScale(element) {
		element.childNodes.forEach(node => {
			if (node.nodeName === '#text' && node.length > 13) {
				let fontSize = window.getComputedStyle(node.parentNode, null).fontSize;
				
				if (this.scale === 1.5 && !node.parentNode.style.fontSize) {
					node.parentNode.style.fontSize = parseInt(fontSize) * this.scale + 'px';
				} else if (this.scale === 1) {
					node.parentNode.style.fontSize = '';
				}
			} else {
				this.setScale(node);
			}
		});
	}

	scaleChange(event) {
		if (event.target.classList.contains('scale_btn')) {
			this.scale = parseFloat(event.target.value);
			localStorage.setItem('scale', this.scale);
		}

		this.setScale(document.body);
	}

	setColor() {
		document.body.style.backgroundColor = this.color;
	}

	colorChange(event) {
		document.body.style.backgroundColor = event.target.value;
		localStorage.setItem('color', event.target.value);
	}

	createPanel() {
		let scaleInputS = document.createElement('input'),
		scaleInputM = document.createElement('input'),
		panel = document.createElement('div');

		scaleInputS.classList.add('scale_btn');
		scaleInputM.classList.add('scale_btn');
		this.btnBlock.classList.add('scale');
		panel.classList.add('panel');
		this.colorPicker.classList.add('color');
		this.clear.classList.add('clear');

		scaleInputS.setAttribute('type', 'button');
		scaleInputM.setAttribute('type', 'button');
		scaleInputS.setAttribute('value', '1x');
		scaleInputM.setAttribute('value', '1.5x');
		this.colorPicker.setAttribute('type', 'color');
		this.colorPicker.setAttribute('value', this.color);
		this.clear.innerHTML = '&times';

		this.btnBlock.append(scaleInputS, scaleInputM);
		panel.append(this.btnBlock, this.colorPicker, this.clear);

		document.body.append(panel);
	}

	clearСustomization() {
		this.scale = 1;
		this.setScale(document.body);

		this.color = '#ffffff';
		this.setColor();
		this.colorPicker.setAttribute('value', this.color);

		localStorage.clear();
	}
	
	render() {		
		this.createPanel();
		this.setScale(document.body);
		this.setColor();

		this.btnBlock.addEventListener('click', event => this.scaleChange(event));
		this.colorPicker.addEventListener('input', event => this.colorChange(event));
		this.clear.addEventListener('click', () => this.clearСustomization());
	}
}
