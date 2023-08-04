import { Space , DatePicker } from 'antd'

const ProductsPageTop = () => {

    const { RangePicker } = DatePicker;

  return (
    <div className="w-full pt-0 pb-0 md:pt-0 md:pb-5 md:border-b border-lightBorderColor block">
        <div className="flex justify-center items-center md:justify-between">
          <section className="block">
            <div className="text-black text-2xl not-italic font-AeonikProMedium">
            Добавить продукт
            </div>
          </section>
          <section className="mobileDate hidden md:flex items-center gap-x-[30px]">
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </section>
        </div>
      </div>
  )
}

export default ProductsPageTop
