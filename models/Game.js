class Game {
  players;
  roomName;
  bombPattern;

  constructor(gameRoom) {
    this.players = [];
    this.roomName = gameRoom;
    this.bombPattern = [];
  }

  isFull() {
    return this.players.length > 2;
  }

  isEmpty() {
    return this.players.length === 0;
  }

  join(username, id) {
    this.players.push({ id, username, score: 0 });
  }

  leaveRoom(id) {
    this.players = this.players.filter((player) => {
      return player.id !== id;
    });
  }

  randombomb() {
    const randomBomb = [];
    for (let x = 0; x < 6; x++) {
      randomBomb.push(Math.floor(Math.random() * 36) + 1);
    }
    for (let x = 0; x < 36; x++) {
      if (randomBomb.includes(x)) {
        this.bombPattern.push({ bomb: true });
      } else {
        this.bombPattern.push({ bomb: false });
      }
    }
  }

  getPoint(id) {
    this.players.map((player) => {
      if (this.players.id === id) {
        return { id, username: player.username, score: player.score + 1 };
      }
    });
  }
}

module.exports = Game;
