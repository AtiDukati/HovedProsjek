
const { createHmac } = await import('node:crypto');
const secret = 'abcdefg';

function hash(sourceText){

const hash = createHmac('sha256', secret)
               .update(sourceText)
               .digest('hex');
               
return hash;
};

export default hash