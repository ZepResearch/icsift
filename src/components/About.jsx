"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, FileText, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import PocketBase from 'pocketbase'
import { motion } from "framer-motion"

export default function AboutConference() {
  const [downloadMaterials, setDownloadMaterials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setIsLoading(true)
        const pb = new PocketBase('https://conference.pockethost.io')
        
        // Fetch all download materials sorted by creation date
        const records = await pb.collection('ICSIFT_download_material').getFullList({
          sort: '-created',
        })
        
        // Transform records to include proper download URLs
        const materials = records.map(record => ({
          name: record.title,
          file: pb.files.getUrl(record, record.file),
          id: record.id
        }))
        
        setDownloadMaterials(materials)
      } catch (err) {
        console.error("Error fetching materials:", err)
        setError("Failed to load download materials")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaterials()
  }, [])

  // Function to handle file download
  const handleDownload = (fileUrl, fileName) => {
    // Create a temporary anchor element
    const link = document.createElement('a')
    link.href = fileUrl
    link.setAttribute('download', fileName)
    link.setAttribute('target', '_blank')
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom * 0.15,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#f8faf5]">
      <div className="max-w-screen-2xl mx-auto">
        {/* Main Card */}
        <motion.div 
          className="bg-[#edf6e1] rounded-3xl p-6 md:p-10 overflow-hidden relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Navigation Dots */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex-col gap-3 hidden md:flex">
            <motion.div 
              custom={0}
              variants={dotVariants}
              className="w-2 h-2 rounded-full bg-green-500/40"
            />
            <motion.div 
              custom={1}
              variants={dotVariants}
              className="w-2 h-2 rounded-full bg-green-500/80"
            />
            <motion.div 
              custom={2}
              variants={dotVariants}
              className="w-2 h-2 rounded-full bg-green-500/40"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div className="md:pl-8">
              <motion.div 
                variants={itemVariants}
                className="inline-block border border-[#1a2e1a] rounded-full px-4 py-1 text-sm mb-6"
              >
                About ICSIFT
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4"
              >
                3<sup>rd</sup> International Conference on Sustainability, Innovation, and Future Technologies
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-[#4d724d] mb-6"
              >
                The International Conference on Sustainability, Innovation, and Future Technologies (ICSIFT) is a
                premier global event bringing together experts, researchers, and industry leaders to explore
                groundbreaking advancements. The conference focuses on sustainable development, cutting-edge
                innovations, and transformative technologies shaping the future. ICSIFT aims to inspire collaboration,
                foster innovation, and drive actionable solutions for a sustainable and technologically advanced world.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-white text-[#1a2e1a] hover:bg-[#f0f5eb] border border-[#d3e4c5] rounded-full">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Download Materials
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-amber-50">
                    {isLoading ? (
                      <DropdownMenuItem disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Loading materials...</span>
                      </DropdownMenuItem>
                    ) : error ? (
                      <DropdownMenuItem disabled>
                        <span className="text-red-500">{error}</span>
                      </DropdownMenuItem>
                    ) : downloadMaterials.length === 0 ? (
                      <DropdownMenuItem disabled>
                        <span>No materials available</span>
                      </DropdownMenuItem>
                    ) : (
                      downloadMaterials.map((item, index) => (
                        <DropdownMenuItem 
                          key={item.id || index} 
                          onClick={() => handleDownload(item.file, item.name)}
                          className="flex items-center cursor-pointer"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <span>{item.name}</span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu> */}

                <Link href="/about-conference">      
                  <Button
                    variant="ghost"
                    className="text-[#1a2e1a] hover:bg-white/50 border border-[#1a2e1a] rounded-full"
                  >
                    Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Image Only */}
            <motion.div 
              variants={imageVariants}
              className="relative bg-white rounded-3xl overflow-hidden shadow-sm drop-shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm z-10"
              >
                <FileText className="h-5 w-5 text-[#1a2e1a]" />
              </motion.div>
              
              {/* Full-width Image */}
              <div className="relative h-80 md:h-96 w-full overflow-hidden">
                <motion.div
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src="/gallery/2nd-ICSIFT_03.jpg"
                    alt="Sustainable Materials"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}