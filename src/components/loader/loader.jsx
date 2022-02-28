import './loader.css';

export default function Loader(props) {
    const color = `radial-gradient(farthest-side, ${props.color ?? "#ffffff"} 92%, #0000)`;
    const style = {
        width: props.width ?? 25,
        height: props.height ?? 25,
        background: `${color} 50% 0, ${color} 50% 100%, ${color} 100% 50%, ${color} 0 50%`,
        backgroundSize: "7px 7px",
        backgroundRepeat: "no-repeat",
        animation: "s7 1s infinite",
        ...props.style,
    };
    return (
        <div className="loader" style={style}></div>
    );
}