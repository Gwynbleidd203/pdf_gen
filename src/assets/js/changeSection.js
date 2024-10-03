const controlObj = {

    validate: {

        name: "validate",
        section: document.querySelector('#validate-section'),
        form: document.querySelector('#validate-form'),
        btn: document.querySelector('#validate-btn'),
        input: document.querySelector('#file__input-pdf'),
        isVisible: false,
        handleClick: function() {
            this.changeVisibility();
        },
        changeVisibility: function() {
            this.isVisible = this.section.dataset.showing === "true";

            if (!this.isVisible) {

                this.btn.classList.add("btn--active");
                controlObj.generate.btn.classList.remove("btn--active");

                this.section.dataset.showing = String(!this.isVisible);
                
                // Correcting the reference to showing
                controlObj.generate.section.dataset.showing = String(!(controlObj.validate.section.dataset.showing === "true"));
            }

        }
    },

    generate: {

        name: "generate",
        section: document.querySelector('#generate-section'),
        form: document.querySelector('#generate-form'),
        btn: document.querySelector('#generate-btn'),
        input: document.querySelector('#file__input-csv'),
        isVisible: true,
        handleClick: function() {
            this.changeVisibility();
        },

        changeVisibility: function() {

            this.isVisible = this.section.dataset.showing === "true";

            if (!this.isVisible) {

                this.btn.classList.add("btn--active")
                controlObj.validate.btn.classList.remove("btn--active")

                this.section.dataset.showing = String(!this.isVisible);
                
                // Correcting the reference to showing
                controlObj.validate.section.dataset.showing = String(!(controlObj.generate.section.dataset.showing === "true"));
            }

        }
    },

    submissionController: function() {

        

        // Add more event listeners for other forms and inputs here...

        // Example:
        // document.querySelector('#other-form').addEventListener('submit', (e) => handleSubmit(e, document.querySelector('#other-input')));
    },

    init: function() {
        this.validate.isVisible = this.validate.section.dataset.showing === "false";
        this.generate.isVisible = this.generate.section.dataset.showing === "true";

        if (this.validate.btn && this.generate.btn) {
            this.validate.btn.addEventListener('click', this.validate.handleClick.bind(this.validate));
            this.generate.btn.addEventListener('click', this.generate.handleClick.bind(this.generate));
        }

        if (this.validate.form && this.generate.form) {
            this.validate.form.addEventListener('submit', (e) => handleSubmit(e, this.validate.input));
            this.generate.form.addEventListener('submit', (e) => handleSubmit(e, this.generate.input));
        }
    }
};

if (controlObj) console.log(controlObj);

controlObj.init();