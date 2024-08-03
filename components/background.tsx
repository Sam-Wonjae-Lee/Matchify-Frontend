
interface BackgroundProps {
    image: string;
    alt: string;
}

const Background: React.FC<BackgroundProps> = ({ image, alt }) => {
    return (
      <div className="absolute opacity-70 z-0 h-screen w-screen">
        <img src={image} alt={alt}className="absolute w-full h-full object-cover object-center z-0" />
      </div>
    );
  }

export default Background;