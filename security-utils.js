class SecurityUtils {
    // Sanitize input to prevent XSS attacks
    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }
    
    // Validate email format
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validate password strength
    static validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (password.length < minLength) {
            return { valid: false, message: "Password must be at least 8 characters long" };
        }
        if (!hasUpperCase) {
            return { valid: false, message: "Password must contain at least one uppercase letter" };
        }
        if (!hasLowerCase) {
            return { valid: false, message: "Password must contain at least one lowercase letter" };
        }
        if (!hasNumbers) {
            return { valid: false, message: "Password must contain at least one number" };
        }
        if (!hasSpecialChar) {
            return { valid: false, message: "Password must contain at least one special character" };
        }
        
        return { valid: true, message: "Password is strong" };
    }
    
    // Escape HTML for safe display
    static escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Sanitize object recursively
    static sanitizeObject(obj) {
        if (typeof obj !== 'object' || obj === null) return this.sanitizeInput(obj);
        
        const sanitized = {};
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                sanitized[key] = this.sanitizeInput(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitized[key] = this.sanitizeObject(obj[key]);
            } else {
                sanitized[key] = obj[key];
            }
        }
        return sanitized;
    }
}
