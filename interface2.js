        document.addEventListener('DOMContentLoaded', () => {
            const screen = document.getElementById('screen');
            const timerElement = document.getElementById('timer');
            let timeLeft = 10000;

            function updateTimer() {
                if (timeLeft > 0) {
                    timeLeft -= 10;
                    const seconds = Math.floor(timeLeft / 1000);
                    const milliseconds = timeLeft % 1000;
                    timerElement.textContent = `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
                    setTimeout(updateTimer, 10);
                }
            }

            updateTimer();

            function handleButtonPress(e) {
                e.preventDefault();
                const button = e.target.closest('[data-button], [data-direction]');
                if (button) {
                    if (button.dataset.button) {
                        screen.textContent = `Bouton : ${button.dataset.button}`;
                    } else if (button.dataset.direction) {
                        screen.textContent = `Direction : ${button.dataset.direction}`;
                    }
                    button.style.opacity = '0.7';
                }
            }

            function handleButtonRelease(e) {
                e.preventDefault();
                const button = e.target.closest('[data-button], [data-direction]');
                if (button) {
                    button.style.opacity = '1';
                }
            }

            document.querySelectorAll('[data-button], [data-direction]').forEach(button => {
                button.addEventListener('touchstart', handleButtonPress);
                button.addEventListener('touchend', handleButtonRelease);
                button.addEventListener('mousedown', handleButtonPress);
                button.addEventListener('mouseup', handleButtonRelease);
            });
        });