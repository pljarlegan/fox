module.exports = class Section {
  constructor(name = "") {
    this.name = name;
    this.status = { ok: 0, ko: 0 };
    this.log = [];
  }

  addRequest(request) {
    this.log.push(request);

    if (request.status >= 200 && request.status <= 299) {
      this.status.ok++;
    } else {
      this.status.ko++;
    }
    return this;
  }

  getErrorRate() {
    return Math.round((Math.abs(this.status.ko) / (this.status.ok + this.status.ko)) * 100);
  }

  cleanLogsOlderThan(time) {
    this.log = this.log.filter((r) => {
      return r.date >= time;
    });
    return this;
  }

  getHits() {
    return this.log.length;
  }

};
