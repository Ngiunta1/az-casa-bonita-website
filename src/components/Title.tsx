interface TitleProps {
  title: string;
}

const Title = (props: TitleProps) => {
  return <h2 className="text-3xl font-noto text-white">{props.title}</h2>;
};

export default Title;
