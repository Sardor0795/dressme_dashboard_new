import { Space , DatePicker } from 'antd'

const ProductsPageTop = () => {

    const { RangePicker } = DatePicker;
    
  return (
    <div className="w-full pt-6 pb-4 md:pt-0 md:pb-5 md:border-b border-lightBorderColor block">
        <div className="flex justify-end items-center md:justify-between">
          <section className="hidden md:block">
            <div className="text-black text-2xl not-italic font-AeonikProMedium">
            Добавить продукт
            </div>
          </section>
          <section className="mobileDate flex items-center gap-x-[30px]">
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </section>
        </div>
        <section className="flex md:hidden pt-6">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            С возвращением, Абдулазиз!
          </p>
        </section>
      </div>
  )
}

export default ProductsPageTop
