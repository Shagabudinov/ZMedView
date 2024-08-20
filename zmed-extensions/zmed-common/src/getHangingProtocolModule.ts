import mammography from './hps/mammo';

function getHangingProtocolModule() {
  return [
    {
      name: mammography.id,
      protocol: mammography,
    },
  ];
}

export default getHangingProtocolModule;
