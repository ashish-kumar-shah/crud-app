class StorageClass {
  constructor() {
    this.key = "userInfo";
  
  }

  initialize() {
    if (!this.isCreated()) {
      this.setData({}); 
    }
  }

  isCreated() {
    return localStorage.getItem(this.key) !== null;
  }

  getData() {
    const storedData = localStorage.getItem(this.key);
    try {
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return {};
    }
  }

  getDataById(id) {
    const data = this.getData();
    if (data && data[id]) {
     const newdata = data[id];
     return newdata;
    }
    console.error(`No data found for id: ${id}`);
    return null;
  }

  setData(data) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to set data:", error);
    }
  }

  save(data) {
    const currentData = this.getData();
    if (data && data.id) {
      currentData[data.id] = data;
      this.setData(currentData);
      console.log("Data saved.");
      return currentData[data.id]; // Return the saved data
    } else {
      console.error("Invalid data provided. Data not saved.");
      return null;
    }
  }

  update(id, newData) {
    const data = this.getData();
    if (data && data[id]) {
      data[id] = { ...data[id], ...newData }; // Merge with existing data
      this.setData(data);
      console.log(`Data updated for id: ${id}`);
      return data[id]; // Return the updated data
    }
    console.error(`No data found for id: ${id}`);
    return null;
  }

  remove(id) {
    const data = this.getData();
    if (data && data[id]) {
      const removedData = data[id]; // Store removed data
      delete data[id];
      this.setData(data);
      console.log(`Data removed for id: ${id}`);
      return removedData; // Return the removed data
    }
    console.error(`No data found for id: ${id}`);
    return null;
  }
}
