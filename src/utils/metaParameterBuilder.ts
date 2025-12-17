/**
 * Meta Parameter Configurator - SDK leve client-side
 * 
 * Implementação baseada na documentação oficial da Meta:
 * - Captura e persiste fbp e fbc
 * - Extrai fbclid da URL e converte para fbc
 * - Coleta client_user_agent
 * 
 * Formato dos parâmetros:
 * - fbp: fb.1.{timestamp}.{random_id} (Browser Pixel ID)
 * - fbc: fb.1.{timestamp}.{fbclid} (Click ID)
 */

const FBP_COOKIE_NAME = '_fbp';
const FBC_COOKIE_NAME = '_fbc';
const COOKIE_MAX_AGE_DAYS = 90; // 90 dias conforme recomendação Meta

/**
 * Gera um ID aleatório de 10 dígitos
 */
function generateRandomId(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

/**
 * Obtém timestamp atual em milissegundos
 */
function getCurrentTimestamp(): number {
  return Date.now();
}

/**
 * Lê um cookie pelo nome
 */
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
}

/**
 * Define um cookie com configurações seguras
 */
function setCookie(name: string, value: string, maxAgeDays: number = COOKIE_MAX_AGE_DAYS): void {
  const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;
  
  // Determina o domínio base (remove subdomínio se houver)
  const hostname = window.location.hostname;
  const domainParts = hostname.split('.');
  const domain = domainParts.length > 2 
    ? `.${domainParts.slice(-2).join('.')}`
    : hostname;
  
  // Define o cookie com SameSite=Lax para compatibilidade
  document.cookie = `${name}=${value}; max-age=${maxAgeSeconds}; path=/; domain=${domain}; SameSite=Lax`;
  
  // Também define sem domínio específico como fallback
  document.cookie = `${name}=${value}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
}

/**
 * Valida formato do fbp
 * Formato esperado: fb.{version}.{timestamp}.{random_id}
 */
function isValidFbp(fbp: string | undefined): boolean {
  if (!fbp) return false;
  const parts = fbp.split('.');
  return parts.length === 4 && parts[0] === 'fb' && parts[1] === '1';
}

/**
 * Valida formato do fbc
 * Formato esperado: fb.{version}.{timestamp}.{fbclid}
 */
function isValidFbc(fbc: string | undefined): boolean {
  if (!fbc) return false;
  const parts = fbc.split('.');
  return parts.length >= 4 && parts[0] === 'fb' && parts[1] === '1';
}

/**
 * Gera um novo fbp (Browser Pixel ID)
 */
function generateFbp(): string {
  const timestamp = getCurrentTimestamp();
  const randomId = generateRandomId();
  return `fb.1.${timestamp}.${randomId}`;
}

/**
 * Gera fbc a partir do fbclid
 */
function generateFbcFromFbclid(fbclid: string): string {
  const timestamp = getCurrentTimestamp();
  return `fb.1.${timestamp}.${fbclid}`;
}

/**
 * Extrai fbclid da URL atual
 */
function extractFbclidFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('fbclid');
}

/**
 * Classe principal do Parameter Configurator
 */
export class MetaParameterBuilder {
  private fbp: string | undefined;
  private fbc: string | undefined;
  private clientUserAgent: string;
  private updatedCookies: Array<{ name: string; value: string; maxAge: number }> = [];

  constructor() {
    this.clientUserAgent = navigator.userAgent;
    this.processRequest();
  }

  /**
   * Processa a requisição e configura os parâmetros
   * Seguindo a lógica do SDK oficial da Meta
   */
  processRequest(): void {
    // 1. Tenta obter fbp existente
    let existingFbp = getCookie(FBP_COOKIE_NAME);
    
    // 2. Se não existe ou é inválido, gera novo
    if (!isValidFbp(existingFbp)) {
      this.fbp = generateFbp();
      this.updatedCookies.push({
        name: FBP_COOKIE_NAME,
        value: this.fbp,
        maxAge: COOKIE_MAX_AGE_DAYS,
      });
      setCookie(FBP_COOKIE_NAME, this.fbp);
      console.log('Meta ParamBuilder - Novo fbp gerado:', this.fbp);
    } else {
      this.fbp = existingFbp;
      console.log('Meta ParamBuilder - fbp existente:', this.fbp);
    }

    // 3. Processa fbc
    let existingFbc = getCookie(FBC_COOKIE_NAME);
    const fbclid = extractFbclidFromUrl();

    // Se tem fbclid na URL, sempre atualiza o fbc
    if (fbclid) {
      this.fbc = generateFbcFromFbclid(fbclid);
      this.updatedCookies.push({
        name: FBC_COOKIE_NAME,
        value: this.fbc,
        maxAge: COOKIE_MAX_AGE_DAYS,
      });
      setCookie(FBC_COOKIE_NAME, this.fbc);
      console.log('Meta ParamBuilder - Novo fbc gerado de fbclid:', this.fbc);
    } else if (isValidFbc(existingFbc)) {
      // Usa fbc existente se válido
      this.fbc = existingFbc;
      console.log('Meta ParamBuilder - fbc existente:', this.fbc);
    }
    // Se não tem fbclid nem fbc válido, fbc permanece undefined
  }

  /**
   * Retorna o fbp (Browser Pixel ID)
   */
  getFbp(): string | undefined {
    return this.fbp;
  }

  /**
   * Retorna o fbc (Click ID)
   */
  getFbc(): string | undefined {
    return this.fbc;
  }

  /**
   * Retorna o User Agent do cliente
   */
  getClientUserAgent(): string {
    return this.clientUserAgent;
  }

  /**
   * Retorna lista de cookies atualizados
   */
  getUpdatedCookies(): Array<{ name: string; value: string; maxAge: number }> {
    return this.updatedCookies;
  }

  /**
   * Retorna todos os parâmetros para envio à CAPI
   */
  getParameters(): {
    fbp: string | undefined;
    fbc: string | undefined;
    client_user_agent: string;
  } {
    return {
      fbp: this.fbp,
      fbc: this.fbc,
      client_user_agent: this.clientUserAgent,
    };
  }
}

// Singleton para uso global
let paramBuilderInstance: MetaParameterBuilder | null = null;

/**
 * Obtém ou cria a instância do Parameter Builder
 */
export function getMetaParamBuilder(): MetaParameterBuilder {
  if (!paramBuilderInstance) {
    paramBuilderInstance = new MetaParameterBuilder();
  }
  return paramBuilderInstance;
}

/**
 * Reinicializa o Parameter Builder (útil após navegação)
 */
export function refreshMetaParams(): MetaParameterBuilder {
  paramBuilderInstance = new MetaParameterBuilder();
  return paramBuilderInstance;
}
