const controlObj = {

    validate: {

        section: document.querySelector('#validate-section'),
        btn: document.querySelector('#validate-btn'),
        isVisible: false,
        handleClick: function() {

            this.changeVisibility()
        },
        changeVisibility: function() {

            this.isVisible = this.section.dataset.showing === "true"
            this.section.dataset.showing = !this.isVisible
        }
    },

    generate: {

        section: document.querySelector('#generate-section'),
        btn: document.querySelector('#generate-btn'),
        isVisible: true,
        handleClick: function() {

            this.changeVisibility()
        },
        changeVisibility: function() {

            this.isVisible = this.section.dataset.showing === "true"
            this.section.dataset.setAttribute.dataShowing = !this.isVisible
        }
    },

    init: function() {

        this.validate.isVisible = this.validate.section.dataset.showing === "true";
        this.generate.isVisible = this.generate.section.dataset.showing === "true";

        if (this.validate.btn && this.generate.btn) {
            this.validate.btn.addEventListener('click', this.validate.handleClick.bind(this.validate));
            this.generate.btn.addEventListener('click', this.generate.handleClick.bind(this.generate));
        }
    }
}

/**
 * 
 * @param {Event} e 
 */


if (controlObj) {

    console.log(controlObj)
}