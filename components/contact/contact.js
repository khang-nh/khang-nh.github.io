export const initContact = () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Đang gửi...';

            const accessKey = "d21fd692-09bd-41fc-a91a-0b7103621700";

            const formData = new FormData(contactForm);
            formData.append("access_key", accessKey);

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    const successPopup = document.getElementById('success-popup');
                    if (successPopup) {
                        successPopup.classList.add('show');
                        const closePopupBtn = document.getElementById('close-popup');
                        const closePopupHandler = () => {
                            successPopup.classList.remove('show');
                            closePopupBtn.removeEventListener('click', closePopupHandler);
                        };
                        closePopupBtn.addEventListener('click', closePopupHandler);
                        
                        // Close on overlay click
                        successPopup.addEventListener('click', (event) => {
                            if (event.target === successPopup) {
                                closePopupHandler();
                            }
                        });
                    } else {
                        alert('Cảm ơn bạn đã liên hệ! Tin nhắn của bạn đã được gửi thành công đến email cá nhân của tôi.');
                    }
                    contactForm.reset();
                } else {
                    alert('Có lỗi xảy ra: ' + data.message);
                }
            } catch (error) {
                console.error("Lỗi khi gửi form:", error);
                alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng kiểm tra lại kết nối mạng.');
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
    }
};
