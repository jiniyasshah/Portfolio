
import { Link } from "react-router-dom"
import arrow from "../assets/icons/arrow.svg"
const InfoBox = ({ text, link, btntext }) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
            {text}
        </p>

        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btntext}
            <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
    </div>
)

const renderContent = {
    1: (<h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Jiniyas aka Sanket</span>
        👋
        <br />
        A Software Engineer Student from Nepal
    </h1>),
    2: (<InfoBox text={<>Worked with many companies<br />and picked up many skills along the way</>} link="/about" btntext="Learn more" />),
    3: (<InfoBox text={<>Led multiple projects to success over the years. <br /> Curious about the impact?</>} link="/projects" btntext="Visit my portfolio" />),
    4: (<InfoBox text={<>Need a project done or looking for a dev? <br />I'm just a few keystrokes away</>} link="/contact" btntext="Let's talk" />),
}



const HomeInfo = ({ currentStage }) => {

    return renderContent[currentStage] || null
}

export default HomeInfo
