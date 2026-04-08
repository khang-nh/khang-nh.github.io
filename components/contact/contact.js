export const initContact = () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Đang gửi...';
            
            setTimeout(() => {
                alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
                contactForm.reset();
                btn.disabled = false;
                btn.textContent = originalText;
            }, 1500);
        });
    }
};
