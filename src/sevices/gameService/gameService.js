const API_URL = "http://localhost:3003/user";

export class UserService {


  async changeScore(score) {
    return fetch(`${API_URL}/change-the-score`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(score),
    })
      .then(this.success)
      .catch(this.failure);
  }

  
  async getScore() {
    return fetch(`${API_URL}/get-score`)
      .then(this.success)
      .catch(this.failure);
  }


  async addIteam() {
    return fetch(`${API_URL}/addIteam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.success)
      .catch(this.failure);
  }


  async success(response) {
    const data = await response.json();
    return data;
  }

  failure(response) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
}