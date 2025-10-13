"use client"
import Image from "next/image";
import Picture1 from "../../../public/craft/zoom-parallax/p1.jpeg"
import Picture2 from '../../../public/craft/zoom-parallax/p2.jpeg';
import Picture3 from '../../../public/craft/zoom-parallax/p3.jpeg';
import Picture4 from '../../../public/craft/zoom-parallax/p4.jpeg';
import Picture5 from '../../../public/craft/zoom-parallax/p5.jpeg';
import Picture6 from '../../../public/craft/zoom-parallax/p6.avif';
import Picture7 from '../../../public/craft/zoom-parallax/p7.avif';
import { useScroll, useTransform, motion } from "motion/react";
import { useEffect, useRef } from "react";
 
 
const ZoomParallax = () => {
 
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    })
    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
    const pictures = [
        {
            src: Picture7,
            scale: scale4
        },
        {
            src: Picture2,
            scale: scale5
        },
        {
            src: Picture3,
            scale: scale6
        },
        {
            src: Picture4,
            scale: scale5
        },
        {
            src: Picture5,
            scale: scale6
        },
        {
            src: Picture6,
            scale: scale8
        },
        {
            src: Picture1,
            scale: scale9
        }
    ]
 
    return (
        <div className="text-white bg-black relative">
            <div className="h-[100vh] flex items-center justify-center  text-7xl  ">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] h-[800px] "></div>
                <span className="z-50 text-center">
                    Let&apos;s Cook Some Parallax.
                </span>
            </div>
            <div ref={container} className="h-[300vh]   relative  ">
 
                <div className="sticky top-0 h-[100vh] w-full  flex justify-center items-center overflow-hidden">
                    {pictures.map(({ src, scale }, index) => {
                        return <motion.div key={index} style={{ scale }} className="w-[100%] h-[100%] absolute top-0  flex justify-center items-center">
                            <div
                                className={` relative   h-[25vh] w-[25vw]
                                 ${index === 1 ? 'top-[-30vh] left-[5vw] w-[35vw] h-[30vh]' : ''}
                                 ${index === 2 ? 'top-[-10vh] left-[-26vw] w-[20vw] h-[45vh]' : ''}
                                 ${index === 3 ? 'left-[26vw] w-[25vw] h-[25vh]' : ''}
                                 ${index === 4 ? 'top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]' : ''}
                                 ${index === 5 ? 'top-[27.5vh] left-[-22.5vw] w-[28vw] h-[25vh]' : ''}
                                 ${index === 6 ? 'top-[27.5vh] left-[31vw] w-[20vw] h-[15vh]' : ''}`}
                            >
                                <Image
                                    src={src}
                                    fill
                                    alt="Picture1"
                                    placeholder="blur"
                                    className="object-cover  "
                                />
                            </div>
                        </motion.div>
                    })}
 
                </div>
 
            </div>
            <div className="h-[100vh] flex items-center justify-center  text-6xl bg-black">
                done.
            </div>
        </div>
    );
}
 
export default ZoomParallax;