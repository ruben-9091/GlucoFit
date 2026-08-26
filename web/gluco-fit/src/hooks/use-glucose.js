import { useState, useEffect } from "react";
import {
  listGlucose,
  createGlucose,
  updateGlucose,
  deleteGlucose,
} from "../services/glucose-service/glucose-service";

export default function useGlucose() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const data = await listGlucose();
      setRecords(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function create(payload) {
    const newRecord = await createGlucose(payload);
    setRecords((prev) => [...prev, newRecord]);
  }

  async function update(id, payload) {
    const updated = await updateGlucose(id, payload);
    setRecords((prev) => prev.map((r) => (r._id === id ? updated : r)));
  }

  async function remove(id) {
    await deleteGlucose(id);
    setRecords((prev) => prev.filter((r) => r._id !== id));
  }

  useEffect(() => {
    const fetchData = async () => {
      await load();
    };
    fetchData();
  }, []);

  return {
    records,
    loading,
    error,
    create,
    update,
    remove,
    reload: load,
  };
}
