console.log(screen.width);
console.log(screen.height);

function WidgetBase(options) {
    this.width = options.width;
    this.height = options.height;

    this.x = (screen.width - this.width) / 2;
    this.y = (screen.height - this.height) / 2;

    this.visible = options.visible;
    this.color = options.color;
}

function WidgetPanel() {
    WidgetBase.apply(this, arguments);
}

WidgetPanel.prototype = Object.create(WidgetBase.prototype);
WidgetPanel.prototype.constructor = WidgetPanel;


WidgetPanel.prototype.renderPanel = function () {
    if (this.visible = true) {
        let elem = document.createElement('div');
        elem.setAttribute("id", "userUnblock")
        elem.style.width = this.width + 'px';
        elem.style.height = this.height + 'px';
        elem.style.backgroundColor = this.color;
        elem.style.border = 'medium solid rgb(30, 60, 110)';
        elem.style.position = 'absolute';
        elem.style.left = this.x + 'px';
        elem.style.top = this.y + 'px';
        document.body.appendChild(elem);

        document.onclick = function () {
            if (!event.target.closest('#userUnblock')) {
                elem.remove();
            }
        }
    }
};


function TextWidget() {
    WidgetBase.apply(this, arguments);

    this.languageWindow = options.textBlock.text.languageWindow;
    this.textWindow = options.textBlock.text.textWindow;
    this.font = options.textBlock.font;
    this.align = options.textBlock.align;
    this.clip_mode = options.textBlock.clip_mode;
    this.text_width = function () {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        context.font = this.font;
        var metrics = context.measureText(this.text);
        return Math.ceil(metrics.width);
    }

    // get only after render text!
    this.text_height = function () {
        var elemText = document.getElementsByClassName("textElem")[0];
        elemText.style.font = this.font;
        var height = elemText.clientHeight + 1;
        return height
    }

}
TextWidget.prototype = Object.create(WidgetBase.prototype);
TextWidget.prototype.constructor = TextWidget;

TextWidget.prototype.renderText = function () {
    let elem = document.getElementById('userUnblock');
    let textElem = document.createElement('p');
    textElem.className = 'textElem';
    textElem.style.position = "absolute";

    switch (this.languageWindow) {
        case 'eng':
            text = this.textWindow.eng;
            break
    }


    textElem.style.font = this.font;
    textElem.style.color = "white";
    textElem.innerHTML = text;
    elem.appendChild(textElem);



    switch (this.align) {
        case 'left':
            textElem.style.left = "0px";
            break

        case 'right':
            textElem.style.right = "0px";
            break

        case 'bottom':
            textElem.style.bottom = "0px";
            break

        case 'top':
            break

        case 'HCenter':
            textElem.style.textAlign = "center";
            break

        case 'VCenter':
            textElem.style.margin = "0";
            textElem.style.transform = "translate(0, -50%)";
            textElem.style.top = "50%";
            break
    }


    switch (this.clip_mode) {
        case 'Dots':
            textElem.style.whiteSpace = 'nowrap';
            textElem.style.width = '100%';
            textElem.style.overflow = 'hidden';
            textElem.style.textOverflow = 'ellipsis';
            break

        case 'Cut':
            textElem.style.whiteSpace = 'nowrap';
            textElem.style.width = '100%';
            textElem.style.overflow = 'hidden';
            break

        case 'None' && 'NewLine':
            break
    }

}



function WidgetImage(options) {
    WidgetBase.apply(this, arguments);
    this.bitmap = options.image.bitmap;
}

WidgetImage.prototype = Object.create(WidgetBase.prototype);
WidgetImage.prototype.constructor = WidgetImage;

WidgetImage.prototype.renderImg = function () {
    let imgElem = document.createElement('img');
    imgElem.src = './img/imgUserUnblock.png';
    imgElem.style.position = 'absolute';
    imgElem.style.width = '150px';
    imgElem.style.left = ((this.width - 150) / 2) + 'px';
    imgElem.style.bottom = '80px';
    let elem = document.getElementById('userUnblock');
    elem.appendChild(imgElem);
}


function WidgetButton(options) {
    WidgetBase.apply(this, arguments);

    // this cuctom propertly
    this.bitmap_cancel = options.buttom.bitmap_cancel

    this.bitmap_normal = options.buttom.bitmap_normal;
    this.bitmap_pressed = options.buttom.bitmap_pressed;
    this.bitmap_disabled = options.buttom.bitmap_disabled;

    this.state_normal = options.buttom.state_normal;
    this.state_pressed = options.buttom.state_pressed;
    this.state_disabled = options.buttom.state_disabled;
}


WidgetButton.prototype = Object.create(WidgetBase.prototype);
WidgetButton.prototype.constructor = WidgetButton;

WidgetButton.prototype.renderBtn = function () {
    let btnSource;
    if (this.state_normal === true) {
        btnSource = this.bitmap_normal;
    }

    if (this.state_disabled === true) {
        btnSource = this.bitmap_disabled;
    }

    let btnElemUnblock = document.createElement('img');
    btnElemUnblock.src = btnSource;
    let btnElemUnblockWrap = document.createElement('a');
    btnElemUnblock.style.width = '230px';

    btnElemUnblockWrap.appendChild(btnElemUnblock);
    btnElemUnblockWrap.style.position = 'absolute';
    btnElemUnblockWrap.style.bottom = '5px';
    btnElemUnblockWrap.style.left = '5px';

    let elem = document.getElementById('userUnblock');
    elem.appendChild(btnElemUnblockWrap);


    if (this.state_normal === true || this.bitmap_pressed === true) {
        btnElemUnblockWrap.onclick = function () {
            console.log('actions');
        }
    }


    let btnElemCancel = document.createElement('img');
    btnElemCancel.src = this.bitmap_cancel;
    let btnElemCancelWrap = document.createElement('a');

    btnElemCancelWrap.appendChild(btnElemCancel);
    btnElemCancelWrap.style.position = 'absolute';
    btnElemCancel.style.width = '230px';
    btnElemCancelWrap.style.bottom = '5px';
    btnElemCancelWrap.style.right = '5px';
    elem.appendChild(btnElemCancelWrap);

}




