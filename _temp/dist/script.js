// retro-arcade-interface.js
class RetroArcadeMachine {
  constructor() {
    this.screen = document.getElementById('screen');
    this.timerElement = document.getElementById('timer');
    this.highScoreElement = document.getElementById('high-score');
    this.currentScoreElement = document.getElementById('current-score');
    this.triesElement = document.getElementById('tries');
    this.timeLeft = 10000;
    this.currentScore = 0;
    this.highScore = 0;
    this.tries = 3;

    this.initializeControls();
    this.startTimer();
  }

  initializeControls() {
    const buttons = document.querySelectorAll('[data-button], [data-direction]');
    buttons.forEach(button => {
      button.addEventListener('touchstart', (e) => this.handleButtonPress(e));
      button.addEventListener('touchend', (e) => this.handleButtonRelease(e));
      button.addEventListener('mousedown', (e) => this.handleButtonPress(e));
      button.addEventListener('mouseup', (e) => this.handleButtonRelease(e));
    });
  }

  handleButtonPress(e) {
    e.preventDefault();
    const button = e.target.closest('[data-button], [data-direction]');
    if (button) {
      if (button.dataset.button) {
        this.updateScreen(`Bouton : ${button.dataset.button}`);
      } else if (button.dataset.direction) {
        this.updateScreen(`Direction : ${button.dataset.direction}`);
      }
      button.style.opacity = '0.7';
      this.updateScore(10);  // Increase score by 10 for each button press
    }
  }

  handleButtonRelease(e) {
    e.preventDefault();
    const button = e.target.closest('[data-button], [data-direction]');
    if (button) {
      button.style.opacity = '1';
    }
  }

  updateScreen(message) {
    this.screen.textContent = message;
  }

  updateScore(points) {
    this.currentScore += points;
    this.currentScoreElement.textContent = this.currentScore.toString().padStart(5, '0');
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      this.highScoreElement.textContent = this.highScore.toString().padStart(5, '0');
    }
  }

  startTimer() {
    const updateTimer = () => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 10;
        const seconds = Math.floor(this.timeLeft / 1000);
        const milliseconds = this.timeLeft % 1000;
        this.timerElement.textContent = `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        setTimeout(updateTimer, 10);
      } else {
        this.endGame();
      }
    };
    updateTimer();
  }

  endGame() {
    this.updateScreen("Temps écoulé !");
    this.tries--;
    this.triesElement.textContent = 'X'.repeat(this.tries);
    if (this.tries > 0) {
      setTimeout(() => this.resetGame(), 2000);
    } else {
      this.updateScreen("Game Over!");
    }
  }

  resetGame() {
    this.timeLeft = 10000;
    this.currentScore = 0;
    this.currentScoreElement.textContent = '00000';
    this.updateScreen("Nouvelle partie !");
    this.startTimer();
  }
}

// Initialisation de la machine d'arcade
document.addEventListener('DOMContentLoaded', () => {
  const arcadeMachine = new RetroArcadeMachine();
});