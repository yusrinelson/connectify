import PropTypes from 'prop-types'

const InputOptions = ({title, Icon, color}) => {
  return (
    <div className="flex items-center gap-2 py-2 px-2 mt-2 rounded-md cursor-pointer hover:bg-gray-100 text-[20px]">
      <Icon style={{ color }} sx={{ width: 30, height: 30 }}/>
      <h4 className="text-gray-700 hidden md:block">{title}</h4>
    </div>
  )
}


InputOptions.propTypes = {
    title: PropTypes.string,
    Icon: PropTypes.elementType,
    color: PropTypes.string,
}
export default InputOptions
