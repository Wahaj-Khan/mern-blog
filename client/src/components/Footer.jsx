import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';

const FooterCom = () => {
    return (
        <Footer container className='border border-t-8 border-blue-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='w-full h-10 sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright className='text-base' href='#' by="Wahaj's blog" year={new Date().getFullYear()} />
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href='https://github.com/Wahaj-Khan' icon={BsGithub} />
                        <Footer.Icon href='https://www.linkedin.com/in/wahaj-khan-4a779520a' icon={BsLinkedin} />
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
export default FooterCom