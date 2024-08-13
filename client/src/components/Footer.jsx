import { Footer } from 'flowbite-react';
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";

const FooterCom = () => {
    return (
        <Footer container className='border border-t-8 border-blue-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='w-full h-10 sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright className='text-base' href='#' by="Wahaj's blog" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href='https://github.com/Wahaj-Khan' icon={FaGithub} />
                        <Footer.Icon href='https://www.linkedin.com/in/wahaj-khan-4a779520a' icon={FaLinkedin} />
                        <Footer.Icon href='#' icon={FaFacebook} />
                        <Footer.Icon href='#' icon={FaInstagram} />
                        <Footer.Icon href='#' icon={FaXTwitter} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
export default FooterCom