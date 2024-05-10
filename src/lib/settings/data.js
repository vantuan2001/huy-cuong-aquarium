import { Setting } from "../models";
import { connectToDb } from "../utils";

export const fetchSetting = async (id) => {
  try {
    connectToDb();
    const setting = await Setting.findById(id);
    return setting;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất cài đặt!");
  }
};
