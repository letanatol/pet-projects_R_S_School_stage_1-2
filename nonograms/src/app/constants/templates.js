const templatesObject = {
  easy: {
    tree: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
    ],
    heart: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
    snowflake: [
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
    ],
    five: [
      [0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0],
    ],
    rhombus: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
  },
  medium: {
    tree2: [
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ],
    heart2: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    ],
    snowflake2: [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    ],
    five2: [
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    rhombus2: [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    ],
  },
  hard: {
    tree3: [
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    ],
    heart3: [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    ],
    snowflake3: [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    ],
    five3: [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    ],
    rhombus3: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    ],
  },
};

export default templatesObject;
