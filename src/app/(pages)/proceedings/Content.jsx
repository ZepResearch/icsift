"use client"

import { useEffect, useState } from "react"
import PocketBase from "pocketbase"
import { motion } from "framer-motion"
import Image from "next/image"
import {
    BookOpen,
    MapPin,
    Calendar,
    Hash,
    Users,
    Download,
    FileText,
    Loader2,
    AlertCircle,
} from "lucide-react"

const PB_URL = "https://conference.pockethost.io"

function getFileUrl(record, filename) {
    if (!filename) return null
    return `${PB_URL}/api/files/${record.collectionId}/${record.id}/${filename}`
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
}

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
}

export default function ProceedingsContent() {
    const [proceedings, setProceedings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchProceedings() {
            try {
                const pb = new PocketBase(PB_URL)
                pb.autoCancellation(false)
                const records = await pb.collection("ICSIFT_proceedings").getFullList({
                    sort: "created",
                })
                setProceedings(records)
            } catch (err) {
                console.error("Error fetching proceedings:", err)
                setError("Failed to load proceedings. Please try again later.")
            } finally {
                setLoading(false)
            }
        }
        fetchProceedings()
    }, [])

    return (
        <section className="relative min-h-screen bg-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#4d724d]/10 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#4d724d]/10 rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />
                <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#4d724d]/10 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-[#4d724d]/10 text-[#4d724d] px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <BookOpen className="w-4 h-4" />
                        Conference Publications
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Conference{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4d724d] to-[#4d724d]">
                            Proceedings
                        </span>
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Explore our published conference proceedings featuring cutting-edge
                        research and scholarly contributions from leading academics worldwide.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <Loader2 className="w-10 h-10 text-[#4d724d] animate-spin" />
                        <p className="text-gray-400 text-sm">Loading proceedings…</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-24 gap-4"
                    >
                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                            <AlertCircle className="w-7 h-7 text-red-500" />
                        </div>
                        <p className="text-gray-600 text-center max-w-md">{error}</p>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !error && proceedings.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                            No proceedings available at this time.
                        </p>
                    </motion.div>
                )}

                {/* Proceedings Grid */}
                {!loading && !error && proceedings.length > 0 && (
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {proceedings.map((item, index) => (
                            <ProceedingCard key={item.id} item={item} index={index} />
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    )
}

function ProceedingCard({ item, index }) {
    const coverUrl = getFileUrl(item, item.cover_img)
    const pdfUrl = getFileUrl(item, item.proceedings_pdf)
    const organizers = item.organized_by
        ? item.organized_by.split(",").map((o) => o.trim()).filter(Boolean)
        : []

    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#4d724d]/10 transition-shadow duration-300 overflow-hidden flex flex-col"
        >
            {/* Cover Image */}
            <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-[#4d724d]/10 to-[#4d724d]/10 overflow-hidden">
                {coverUrl ? (
                    <Image
                        src={coverUrl}
                        alt={item.conference_name || "Proceeding cover"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-[#4d724d]" />
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                {/* Acronym Badge */}
                {item.conference_acronym && (
                    <span className="self-start inline-block bg-[#4d724d]/10 text-[#4d724d] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                        {item.conference_acronym}
                    </span>
                )}

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 leading-snug mb-4 line-clamp-2">
                    {item.conference_name}
                </h2>

                {/* Meta Info */}
                <div className="space-y-2 mb-5 flex-1">
                    {item.location && (
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 text-[#4d724d] mt-0.5 shrink-0" />
                            <span>{item.location}</span>
                        </div>
                    )}
                    {item.date && (
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 text-[#4d724d] mt-0.5 shrink-0" />
                            <span>{item.date}</span>
                        </div>
                    )}
                    {item.isbn && (
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                            <Hash className="w-4 h-4 text-[#4d724d] mt-0.5 shrink-0" />
                            <span className="font-mono text-xs">ISBN: {item.isbn}</span>
                        </div>
                    )}
                    {organizers.length > 0 && (
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                            <Users className="w-4 h-4 text-[#4d724d] mt-0.5 shrink-0" />
                            <span>{organizers.join(" • ")}</span>
                        </div>
                    )}
                </div>

                {/* Download Button */}
                {pdfUrl && (
                    <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-[#4d724d]/90 text-[#4d724d] hover:from-[#4d724d]/700 hover:to-[#4d724d]/600 text-white text-sm font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-blue-200"
                    >
                        <Download className="w-4 h-4" />
                        Download Proceedings
                    </a>
                )}
            </div>
        </motion.div>
    )
}
