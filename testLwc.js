import { LightningElement,track } from 'lwc';

export default class TestLwc extends LightningElement {
    @track currentStep = 'step-1';
    
    steps = [
        { label: 'Contacted', value: 'step-1' },
        { label: 'Open', value: 'step-2' },
        { label: 'Unqualified', value: 'step-3' },
        { label: 'Nurturing', value: 'step-4' },
        { label: 'Closed', value: 'step-5' },
    ];

    handleStepClick(event) {
        const clickedStep = event.target.value;
        this.updateStep(clickedStep);
    }

    updateStep(newStep) {
        const currentIndex = this.steps.findIndex(step => step.value === this.currentStep);
        const newIndex = this.steps.findIndex(step => step.value === newStep);

        if (newIndex > currentIndex) {
            // Moving forward: update all steps in between
            for (let i = currentIndex + 1; i <= newIndex; i++) {
                this.markStepComplete(this.steps[i].value);
            }
        } else if (newIndex < currentIndex) {
            // Moving backward: update all steps in between
            for (let i = currentIndex; i > newIndex; i--) {
                this.markStepIncomplete(this.steps[i].value);
            }
        }

        this.currentStep = newStep;
        this.dispatchStepChangeEvent();
    }

    markStepComplete(stepValue) {
        const step = this.template.querySelector(`lightning-progress-step[value="${stepValue}"]`);
        if (step) {
            step.classList.add('slds-is-completed');
        }
    }

    markStepIncomplete(stepValue) {
        const step = this.template.querySelector(`lightning-progress-step[value="${stepValue}"]`);
        if (step) {
            step.classList.remove('slds-is-completed');
        }
    }

    dispatchStepChangeEvent() {
        const stepChangeEvent = new CustomEvent('stepchange', {
            detail: { step: this.currentStep }
        });
        this.dispatchEvent(stepChangeEvent);
    }
}
