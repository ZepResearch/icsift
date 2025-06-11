"use client"
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DownloadCloudIcon } from "lucide-react";
import PocketBase from 'pocketbase';
import { pb } from "@/lib/pocketbase";



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Buttons() {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const records = await pb.collection('ICSIFT_download_material').getFullList({
          sort: 'created',
          requestKey: null
        });
        setMaterials(records);
      } catch (err) {
        setError("Failed to load materials");
        console.error("Error fetching materials:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const handleDownload = async (record) => {
    try {
      // Construct the file URL using PocketBase's getFileUrl method
      const fileUrl = pb.getFileUrl(record, record.content);
      // Open the file URL in a new tab
      window.open(fileUrl, '_blank');
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4">
        {error}
      </div>
    );
  }

  return (
    <section className="py-4 max-w-7xl mx-auto">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center mx-auto">
          <h1 className="text-center text-2xl pb-6 inline-flex justify-center items-center gap-3 font-medium text-green-800">
            Download Conference Materials <DownloadCloudIcon />
          </h1>
        </div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {materials.map((material) => (
            <motion.a
              key={material.id}
              href={`https://conference.pockethost.io/api/files/ICSIFT_download_material/${material.id}/${material.file}`}
              className="bg-[#4d724d] hover:bg-[#4d724d]/90 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 text-sm sm:text-sm text-center drop-shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {material.title}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}