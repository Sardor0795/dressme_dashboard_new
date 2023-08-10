import { Space , DatePicker } from 'antd'

const ProductsPageTop = () => {

    const { RangePicker } = DatePicker;
    
  return (
    <div className="w-full pt-6 pb-[34px] md:pt-0 md:pb-5 md:border-b border-lightBorderColor block">
        <div className="flex items-center justify-center md:justify-between">
          <section className="block">
            <div className="text-black text-2xl not-italic font-AeonikProMedium">
            Добавить продукт
            </div>
          </section>
          <section className="hidden mobileDate md:flex items-center gap-x-[30px]">
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </section>
        </div>
      </div>
  )
}

export default ProductsPageTop
