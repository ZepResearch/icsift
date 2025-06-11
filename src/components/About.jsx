"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, FileText, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import PocketBase from 'pocketbase'

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

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#f8faf5]">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="bg-[#edf6e1] rounded-3xl p-6 md:p-10 overflow-hidden relative">
          {/* Navigation Dots */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2  flex-col gap-3 hidden md:flex">
            <div className="w-2 h-2 rounded-full bg-[#4d724d]/40"></div>
            <div className="w-2 h-2 rounded-full bg-[#4d724d]/80"></div>
            <div className="w-2 h-2 rounded-full bg-[#4d724d]/40"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div className="md:pl-8">
              <div className="inline-block border border-[#1a2e1a] rounded-full px-4 py-1 text-sm mb-6">
                About ICSIFT
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-4">
               2<sup>nd</sup> International Conference on Sustainability, Innovation, and Future Technologies
              </h2>
              <p className="text-[#4d724d] mb-6">
                The International Conference on Sustainability, Innovation, and Future Technologies (ICSIFT) is a
                premier global event bringing together experts, researchers, and industry leaders to explore
                groundbreaking advancements. The conference focuses on sustainable development, cutting-edge
                innovations, and transformative technologies shaping the future. ICSIFT aims to inspire collaboration,
                foster innovation, and drive actionable solutions for a sustainable and technologically advanced world.
              </p>

              <div className="flex flex-wrap gap-4">
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
              </div>
            </div>

            {/* Right Content - Image Only */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm drop-shadow-2xl">
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm z-10">
                <FileText className="h-5 w-5 text-[#1a2e1a]" />
              </div>
              
              {/* Full-width Image */}
              <div className="relative h-80 md:h-96 w-full">
                <Image
                  src="/gallery/ICSIFT_09.jpg"
                  alt="Sustainable Materials"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}