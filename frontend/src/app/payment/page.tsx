"use server";
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import PriceTag from '@/components/PriceTag';

export default async function payment() {



  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/payment");
  }

  const userId = session.user.id || null;
  const products = await fetch(`http://localhost:3000/cart/user/${userId}`).then((response) => response.json()).then((data) => data);

  const subtotal = products.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);


  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

      <div className="flex justify-start item-start space-y-2 flex-col">
      <h1 className="text-3xl dark:text-black lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Finalizar pedido</h1>
      <p className="text-base dark:text-black font-medium leading-6 text-gray-600">{new Date().toLocaleDateString('pt-BR')}</p>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
      <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
        <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Carrinho do Cliente</p>
        {products.items.map((item) => (
          <div key={item.product.id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
          <div className="pb-4 md:pb-8 w-full md:w-40">
            <img className="w-full hidden md:block" src={item.product.imageUrl} alt="dress" />
            <img className="w-full md:hidden" src={item.product.imageUrl} alt="dress" />
          </div>
          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start items-start space-y-8">
            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.product.name}</h3>
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-sm dark:text-white leading-none text-gray-800 w-full"><span className="dark:text-gray-400 text-gray-300">descrição: </span>{item.product.description}</p>
            </div>
            </div>
            <div className="flex justify-between space-x-6 items-start w-full">
            <p className="text-base dark:text-white xl:text-lg leading-6"><span className="text-red-300 line-through"><PriceTag price={item.product.price} /></span></p>
            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{item.quantity}X</p>
            <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800"><PriceTag price={item.product.price * item.quantity} /></p>
            </div>
          </div>
          </div>
        ))}
        </div>
        <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Resumo</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
          <div className="flex justify-between w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600"><PriceTag price={subtotal} /></p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white leading-4 text-gray-800">Frete</p>
            <p className="text-base dark:text-gray-300 leading-4 text-gray-600"><PriceTag price={800} /></p>
          </div>
          </div>
          <div className="flex justify-between items-center w-full">
          <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
          <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600"><PriceTag price={subtotal + 800} /></p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Envio</h3>
          <div className="flex justify-between items-start w-full">
          <div className="flex justify-center items-center space-x-4">
            <div className="w-8 h-8">
            <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
            </div>
            <div className="flex flex-col justify-start items-center">
            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">Waltinho Delivery<br /><span className="font-normal">Entrega em 24 horas</span></p>
            </div>
                </div>
                <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">R$8.00</p>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">Fechar pedido</button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Comprador</h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img src={session.user.image} alt="avatar" />
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{session.user.name}</p>
                </div>
              </div>

              <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="cursor-pointer text-sm leading-5 ">{session.user.email}</p>
              </div>
              <div>
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                  <div className="w-full p-3 border-b border-gray-200">
                    <div className="mb-5">
                      <label htmlFor="type1" className="flex items-center cursor-pointer">
                        <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked />
                        <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-6 ml-3" />
                      </label>
                    </div>
                    <div>
                      <div className="mb-3">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Nome</label>
                        <div>
                          <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Walter Barbosa" type="text" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Número</label>
                        <div>
                          <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                        </div>
                      </div>
                      <div className="mb-3 -mx-2 flex items-end">
                        <div className="px-2 w-1/4">
                          <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">VAL</label>
                          <div>
                            <select className="form-select w-full px-1 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                              <option value="01">Jan</option>
                              <option value="02">Fev</option>
                              <option value="03">Mar</option>
                              <option value="04">Abr</option>
                              <option value="05">Mai</option>
                              <option value="06">Jun</option>
                              <option value="07">Jul</option>
                              <option value="08">Ago</option>
                              <option value="09">Set</option>
                              <option value="10">Out</option>
                              <option value="11">Nov</option>
                              <option value="12">Dez</option>
                            </select>
                          </div>
                        </div>
                        <div className="px-2 w-1/2">
                          <select className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                          </select>
                        </div>
                        <div className="px-2 w-1/2">
                          <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">CDC</label>
                          <div>
                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-3">
                    <label htmlFor="type2" className="flex items-center cursor-pointer">
                      <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" className="ml-3" />
                    </label>
                  </div>
                  <div className="w-full p-3">
                    <label htmlFor="type3" className="flex items-center cursor-pointer">
                      <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type3 " />
                      <img src="https://logopng.com.br/logos/pix-106.svg" width="80" className="ml-3" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
