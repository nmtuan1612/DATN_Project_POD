import { useContext } from 'react'
import { Link } from 'react-router-dom'
import bidv from 'src/assets/BIDV.svg'
import americanExpress from 'src/assets/american_express.png'
import masterCard from 'src/assets/mastercard.svg'
import visa from 'src/assets/visa.svg'
import { AppUrls } from 'src/config/config'
import { Categories } from 'src/config/constants'
import path from 'src/config/path'
import { AppContext } from 'src/context/app.context'

type Props = {}

const Footer = ({}: Props) => {
  const { currentStore } = useContext(AppContext)

  return (
    <div className='container my-4'>
      <div className='flex flex-col justify-between border-t py-10 md:flex-row'>
        {/* col 1 */}
        <div className=''>
          <Link to='/' className='logo'>
            {/* PrintVana */}
            <span className='text-primary'>Creo</span>
            <span className='text-gray-400'>Print</span>
          </Link>
          <h3 className='font-medium text-gray-500'>Unleash your imagination</h3>
        </div>
        {/* col 2 */}
        <div className=''>
          {/* links */}
          <div className='flex w-fit flex-col flex-wrap space-y-4'>
            {Categories.map((category) => (
              <Link key={category.id} to={AppUrls.categoryProduct(category.id)} className='nav__link-item inline-block'>
                {category.name.replace('Clothes', '')}
              </Link>
            ))}
          </div>
        </div>
        {/* col 3 */}
        <div className=''>
          <div className='flex w-fit flex-col flex-wrap space-y-4'>
            <Link to={AppUrls.categoryProduct('Bestsellers')} className='nav__link-item inline-block'>
              Bestsellers
            </Link>
            <Link to={AppUrls.categoryProduct('New-Arrivals')} className='nav__link-item inline-block'>
              New Arrivals
            </Link>
            <Link to={AppUrls.categoryProduct('Eco-friendly')} className='nav__link-item inline-block'>
              Eco-friendly
            </Link>
            <Link to='#' className='nav__link-item inline-block'>
              License
            </Link>
          </div>
        </div>
        {/* col 4 */}
        <div className=''>
          <div className='flex w-fit flex-col flex-wrap space-y-4'>
            <Link to='#' className='nav__link-item inline-block'>
              Contact Us
            </Link>

            <Link to='#' className='nav__link-item inline-block'>
              Support Center
            </Link>

            <Link to='#' className='nav__link-item inline-block'>
              Terms
            </Link>
          </div>
        </div>
        {/* col 5 */}
        <div className=''>
          <div className='flex justify-end space-x-2'>
            <img src={visa} alt='visa' />
            <img src={masterCard} alt='master_card' />
            <div className='flex h-[24px] w-[34px] items-center justify-center overflow-hidden rounded-sm border p-0.5'>
              <img src={bidv} alt='bidv' className='object-contain' />
            </div>
            <div className='flex h-[24px] w-[34px] items-center justify-center overflow-hidden rounded-sm border p-0'>
              <img src={americanExpress} alt='american_express' />
            </div>
          </div>
        </div>
      </div>
      <p className='pt-3 text-center italic text-gray-500'>
        Powered by{' '}
        <Link to={path.home} className='font-semibold text-primary'>
          @CreoPrint
        </Link>
      </p>
    </div>
  )
}

export default Footer
