import LandingImage from '../../images/landing_image.svg';

export default {
    container: {
        backgroundImage: `url(${LandingImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundColor: COLORS.background,
        width: '100vw',
        height: '100vh'
    }
}