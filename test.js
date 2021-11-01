const randomGrid = () => {
  const bombGrid = [];
  const randomBomb = [];
  for (let x = 0; x < 6; x++) {
    randomBomb.push(Math.floor(Math.random() * 36) + 1);
  }
  for (let x = 0; x < 36; x++) {
    if (randomBomb.includes(x)) {
      bombGrid.push({ bomb: true, clickYet: false });
    } else {
      bombGrid.push({ bomb: false, clickYet: false });
    }
  }
  return bombGrid;
};

let roomList = [
  {
    id: "1",
    roomName: "testeiei",
    player: [
      { id: "sdkfj", username: "so", score: 0, win: "⭐️" },
      { id: "sdkfasda", username: "mick", score: 0, win: "⭐️" },
    ],
    bomb: undefined,
    turn: 0,
    chat: [],
  },
  {
    id: "12",
    roomName: "testeiei",
    player: [
      { id: "sdkfj", username: "so", score: 0, win: "⭐️" },
      { id: "sdkfasda", username: "mick", score: 0, win: "⭐️" },
    ],
    bomb: undefined,
    turn: 0,
    chat: [],
  },
];

const randomPlayer = Math.floor(Math.random() * 2);
const bomb = randomGrid();

console.log(roomList);
// roomList = roomList.map((room) => {
//   if (room.id === "1") {
//     return { ...room, turn: 123, bomb: randomGrid() };
//   }
// });

roomList = roomList.map((room) => {
  if (room.id === "1") {
    room.player.push({ username: "asdasdasdasd" });
    return {
      ...room,
      bomb: bomb,
      turn: randomPlayer,
    };
  } else {
    return { ...room };
  }
});

console.log(roomList);
