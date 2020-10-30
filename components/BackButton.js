import { Button } from 'antd'

const BackButton = () => (
  <div className='_container'>
    <a href='/'> <Button type='primary'>Antd Button (primary)</Button></a>

  <style jsx>{`
    ._container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}</style>
  </div>
)

export default BackButton
