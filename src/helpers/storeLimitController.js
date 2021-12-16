import { dataLengthLimit } from "../app.config";

export default function storeManager(incomingData, oldData) {
  incomingData.map(data => data['updatedAt'] = new Date());
  oldData.unshift(...incomingData);
  if (oldData.length > dataLengthLimit) {
    oldData.length = dataLengthLimit;
  }
  return oldData;
}