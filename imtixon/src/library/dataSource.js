import fs from "fs";
export class DataSource {
  #dir;
  constructor(dir) {
    this.#dir = dir;
  }

  read() {
    const jsondata = fs.readFileSync(this.#dir, {
      encoding: "utf8",
      flag: "r",
    });
    return jsondata ? JSON.parse(jsondata) : [];
  }
  write(data) {
    fs.writeFileSync(this.#dir, JSON.stringify(data, undefined, 4));
  }
}
