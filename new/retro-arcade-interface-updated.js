retro-arcade-interface-updated.js
// retro-arcade-interface-updated.js

class RetroArcadeMachine {
  constructor() {
    this.initializeElements();
    this.resetGameParameters();
    this.initializeControls();
    this.startGame();
  }

  initializeElements() {
    this.screen = document.getElementById('screen');
    this.timerElement = document.getElementById('timer');
    this.highScoreElement = document.getElementById('high-score');
    this.currentScoreElement = document.getElementById('current-score');
    this.triesElement = document.getElementById('tries');
  }

  resetGameParameters() {
    this.timeLeft = 10000;
    this.currentScore = 0;
    this.highScore = 0;
    this.tries = 3;
    this.startTime = Date.now();
    this.errorCount = 0;
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
      const message = button.dataset.button 
        ? `Bouton : ${button.dataset.button}` 
        : `Direction : ${button.dataset.direction}`;
      this.updateScreen(message);
      button.style.opacity = '0.7';
      this.updateScore(10);
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
    this.updateCurrentScore();
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      this.updateHighScore();
    }
  }

  updateHighScore() {
    this.highScoreElement.textContent = this.highScore.toString().padStart(5, '0');
  }

  updateCurrentScore() {
    this.currentScoreElement.textContent = this.currentScore.toString().padStart(5, '0');
  }

  updateErrorCount() {
    this.triesElement.textContent = 'X'.repeat(this.tries);
  }

  updateElapsedTime() {
    const elapsedTime = Date.now() - this.startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const milliseconds = elapsedTime % 1000;
    this.timerElement.textContent = `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }

  startGame() {
    this.startTime = Date.now();
    this.currentScore = 0;
    this.updateCurrentScore();
    this.updateHighScore();
    this.updateErrorCount();
    this.updateScreen("Nouvelle partie !");

    this.elapsedTimeInterval = setInterval(() => this.updateElapsedTime(), 10);
    this.gameInterval = setInterval(() => this.gameLoop(), 100);
  }

  gameLoop() {
    if (Math.random() < 0.05) {
      this.errorCount++;
      if (this.errorCount >= 3) {
        this.endGame();
      } else {
        this.tries--;
        this.updateErrorCount();
      }
    }
  }

  endGame() {
    clearInterval(this.elapsedTimeInterval);
    clearInterval(this.gameInterval);
    this.updateScreen("Game Over!");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RetroArcadeMachine();
});
