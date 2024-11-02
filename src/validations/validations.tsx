type Validations = {
    validateFullName(value: string): boolean;
    validateEmail(value: string): boolean;
    validatePreferences(value: string): boolean;
};

export const validation: Validations = {
    validateFullName: (value: string) => {
        const pRegex = /^[A-Z][a-z]{2,} [A-Z][a-z]{2,}$/;
        return pRegex.test(value);
    },

    validateEmail: (value: string) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return emailRegex.test(value);
    },

    validatePreferences: (value: string) => {
        return value !== "";
    }
}