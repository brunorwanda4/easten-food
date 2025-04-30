interface props {
  className ?: string
}
const Sparest = ({className} : props) => {
  return <div className={`h-[1px] bg-base-content/20 my-2 ${className}`}/>
}

export default Sparest
