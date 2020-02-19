export default function Editor ( element ) {
    this.element = element

    let elementSource = null
    let container = null
    const toolbar = []
    const iframe = null

    const fonts = [ 'Arail', 'Calibri', 'Comic Sans MS', 'Impact']
    const sizes = [15, 16, 17, 18, 19, 20, 21, 22, 23]
    const colors= ['blue', 'green', 'red', 'yellow', 'black', 'white', 'gray']
    const self = this


    const init = () => {
        elementSource = document.querySelector(self.element)
        elementSource.style.display = 'none'
        container = elementSource.parentElement
        initToolbar(container, toolbar)
        initIframe(container, elementSource)
    }

    this.save = () => {
        elementSource.value = EditorIframe.document.body.innerHTML
    }

    const Component = (commandName, element, event) => {
        this.commandName = commandName
        this.element = document.createElement('li')
        this.element.appendChild(element)
        this.recoverValue = () => {
            return null
        }

        const selfComponent = this
        this.element.addEventListener(event, () => {
            EditorIframe.document.execCommand(commandName, false, selfComponent.recoverValue())
        })
    }

    const ComponentButton = (commandName, icon) => {
        const button = document.createElement('button')
        const buttonIcon = document.createElement('i')
        buttonIcon.classList.add('fa', `fa-${icon}`)
        button.appendChild(buttonIcon)
        Component.call(this, commandName, button, 'click')
    }


    const ComponentSelect = (commandName, values) => {
        const select = document.createElement('select')

        values.forEach((value) => {
            const option = document.createElement('select')
            option.value = value
            option.appendChild(document.createTextNode(value))
            select.appendChild(option)
        })

        Component.call(this, commandName, select, 'change')

        const selfComponentSelect = this
        this.recoverValue = () => selfComponentSelect.element.firstChild.value
    }

    const Space = () => {
        this.element = document.createElement('li')
        this.element.classList.add('space')
        this.element.innerHTML = '&nbsp;'
    }

    const selectedNode = () => EditorIframe.getSelection().anchorNode.parentNode

    const initToolbar = (container, toolbar) => {
        const highlighter = new ComponentButton('backColor', 'highlighter')
        highlighter.recoverValue = () => selectedNode().style.backgroundColor === 'yellow' ? 'white' : 'yellow' 

        const fontColor = new ComponentSelect('forecolor', colors)
        Array.from(fontColor.element.firstChild.options).forEach( option => {
            option.style.color = option.value
        })
        fontColor.element.firstChild.style.color = Array.from(fontColor.element.firstChild.options)[0].value
        fontColor.recoverValue = () => {
            fontColor.element.firstChild.style.color = fontColor.element.firstChild.value
            return fontColor.firstChild.value
        }
        
        const link = new ComponentButton('createLink', 'link')
        link.recoverValue = () => prompt('Entre com o endereço do link!')

        toolbar.push(
            new ComponentSelect('fontname', fonts),
            new ComponentSelect('fontsize', sizes),
            new Space(),
            new ComponentButton('bold', 'bold'),
            new ComponentButton('italic', 'italic'),
            new ComponentButton('underline', underline),
            new ComponentButton('strikethrough', 'strikethrough'),
            new Space(),
            fontColor,
            new Space(),
            highlighter,
            new Space(),
            new ComponentButton('justifyleft', 'align-left'),
            new Component('justifycenter', 'align-center')

        )

        renderToolbar(container, toolbar)
    }

    const renderToolbar = (container, toolbar) => {
        const list = document.createElement('ul')
        list.classList.add('cd-toolbar')

        toolbar.forEach( component => {
            list.appendChild(component.element)
        })
        container.appendChild(list)
    }

    const initIframe = (container, toolbar) => {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('src', 'about:blank')
        iframe.setAttribute('contenteditable', true)
        iframe.setAttribute('id', 'EditorIframe')
        iframe.setAttribute('name', 'EditorIframe')
        iframe.classList.add('cd-editor')

        container.appendChild(iframe)

        EditorIframe.document.body.innerHTML = elementSource.value
        EditorIframe.document.designMode = 'on'
        EditorIframe.document.body.style.margin = 0
        EditorIframe.document.body.style.wordWrap = 'break-word'
    }


}